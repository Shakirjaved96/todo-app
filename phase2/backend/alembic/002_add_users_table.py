"""Add users table

Revision ID: 002_add_users_table
Revises: 001_initial
Create Date: 2026-02-08 12:00:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers
revision = '002_add_users_table'
down_revision = '001_initial'
branch_labels = None
depends_on = None


def upgrade():
    # Create users table
    op.create_table('users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('username', sa.String(), nullable=False),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('hashed_password', sa.String(), nullable=False),
        sa.Column('is_active', sa.Boolean(), nullable=False, default=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email'),
        sa.UniqueConstraint('username')
    )
    
    # Add index for username
    op.create_index(op.f('ix_users_username'), 'users', ['username'], unique=True)
    
    # Add index for email
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
    
    # Add foreign key constraint to tasks table
    op.create_foreign_key('fk_tasks_user_id', 'tasks', 'users', ['user_id'], ['id'])


def downgrade():
    # Drop foreign key constraint
    op.drop_constraint('fk_tasks_user_id', 'tasks', type_='foreignkey')
    
    # Drop indexes
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_index(op.f('ix_users_username'), table_name='users')
    
    # Drop users table
    op.drop_table('users')